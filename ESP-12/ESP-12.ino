#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>

#define WLAN_SSID       "Newgate"
#define WLAN_PASSWORD   "0n3P1ec3"
#define TENSAO          110

const int sensorIn  = A0;
int       buttonIn  = D0;
int       releOut   = D3;
int       mVperAmp  = 66; 
int       estado    = 1;

WiFiClient    clientWifi;

PubSubClient  mqttClient(clientWifi);
char *mqttServer  = "broker.hivemq.com";
int   mqttPort    = 1883;

//---------------- INICIO - GET VPP MEASUREMENT -----------------------//

void setup() {
  Serial.begin(115200);
  delay(100);

  pinMode(buttonIn, INPUT);
  pinMode(releOut, OUTPUT);
  
  conectaWiFi();
  conectaMQTT();
}

//--------------------- FIM - CONEXÃO WIFI ----------------------------//

//---------------- INICIO - GET VPP MEASUREMENT -----------------------//

void loop() {  
  Serial.println(estado);
  if (digitalRead(D0) != LOW) {
    switch(estado) {
      case 1:
        estado = 0;
      break;
  
      case 0:
        estado = 1;
      break;    
    }
  }
  Serial.println(estado);
  
  if (WiFi.status() != WL_CONNECTED) {
    conectaWiFi();
  }

  if (!mqttClient.connected()) {
    conectaMQTT();
  }

  if (estado == 1) {
    digitalWrite(releOut,LOW);
    publishData();
  } else {
    digitalWrite(releOut,HIGH);    
  }
  
  mqttClient.loop();
  delay(400);
}

//--------------------- FIM - CONEXÃO WIFI ----------------------------//

//---------------- INICIO - PUBLISH DATA -------------------------------//

void publishData() {
  DynamicJsonDocument doc(1024);
  char JSONbuffer[1024];
  
  double corrente  = getCorrente() - 0.26;

  doc["sensor_name"]  = "ESP12-001";
  doc["estado"]       = estado;
  doc["corrente"]     = corrente;
  doc["tensao"]       = TENSAO;
  doc["potencia"]     = corrente * TENSAO;
  
  serializeJson(doc,JSONbuffer);
  mqttClient.publish("/luminus-hivemq-mqtt-communication/esp001-sender", JSONbuffer);
  mqttClient.loop();
  
  Serial.print(corrente);
  Serial.print(" A \n");
  
  delay(1000);
}

//--------------------- FIM - PUBLISH DATA ----------------------------//

//---------------- INICIO - GET VPP MEASUREMENT -----------------------//

float getVPPMeasurement () {
  float result;
  int readValue;
  int maxValue = 0;
  int minValue = 1023;
  uint32_t start_time = millis();
  while((millis()-start_time) < 100){
    readValue = analogRead(sensorIn);
    if(readValue > maxValue) { maxValue = readValue; }
    if(readValue < minValue) { minValue = readValue; }
  }
  result = ((maxValue - minValue) * 2.5)/1023.0;
  return result;
}


//------------------ FIM - GET VPP MEASUREMENT -----------------------//

//------------------- INICIO - GET CORRENTE --------------------------//

float getCorrente () {
  double medicao  = getVPPMeasurement();
  double VRMS     = (medicao/2.5) *0.79;
  return ((VRMS * 1000)/mVperAmp);
}

//--------------------- FIM - GET CORRENTE ---------------------------//

//------------------- INICIO - CONEXÃO WIFI --------------------------//

void conectaWiFi() {
  
    if (WiFi.status() == WL_CONNECTED)
        return;
         
    WiFi.begin(WLAN_SSID, WLAN_PASSWORD); 
     
    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(1000);
        Serial.print(".");
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(WLAN_SSID);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
  
}

//--------------------- FIM - CONEXÃO WIFI ---------------------------//

//---------------- INICIO - CONEXÃO SERVER MQTT ----------------------//

void conectaMQTT() {

  Serial.printf("\nTentanto realizar a conexao com o servidor MQTT: %s\n", mqttServer);
  
  mqttClient.setServer(mqttServer, mqttPort); 
  mqttClient.setCallback(callback); 
  while (!mqttClient.connected()) {
    Serial.print("...");
    
    String clientID = "clientId-PlEf6dioIQ";

    if (mqttClient.connect(clientID.c_str())) {
      
      Serial.printf("\nMQTT conectado em: %s",mqttServer);
      mqttClient.subscribe("/luminus-hivemq-mqtt-communication/esp001-receiver");
      
    } else {
      
      Serial.printf("\nA conexao falhou.\n");
      Serial.print(mqttClient.state());
      
      Serial.printf("\nTentando novamente em 5 segundos...");
      delay(5000);
      
    }
  }

}

//------------------- FIM - CONEXÃO SERVER MQTT ----------------------//

//------------------- INICIO - CALLBACK ------------------------------//

void callback(char* topic, byte* payload, unsigned int length) {
  String response;

  for (int i = 0; i < length; i++) {
    response += (char)payload[i];
  }
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  Serial.println(response);
  if(response == "on")  // Turn the light on
  { 
    estado = 1;
    Serial.println("on");
  }
  else if(response == "off")  // Turn the light off
  {
    estado = 0;
    Serial.println("off");
  }
}

//------------------- FIM - CALLBACK -------------------------------//

//------------------- INICIO - ALTERA ESTADO -----------------------//

void alteraEstado () {
}

//------------------- FIM - ALTERA ESTADO --------------------------//
