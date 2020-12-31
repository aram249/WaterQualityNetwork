/*********************************************************************
 * WaterMonitor.ino
 *
 * Description:
 * This sample code is mainly used to monitor water quality including: 
 *  temperature in degrees celcius(*C)
 *  Electrical Conductivity(ec)
 *  Potential of Hydrogen levels(pH)
 *  turbidity
 *  
 *  
 * Cited Code Libraries:
 *  Arduino library for Gravity: Analog Electrical Conductivity Sensor / Meter Kit V2 (K=1), SKU: DFR0300
 *    Copyright   [DFRobot](http://www.dfrobot.com), 2018
 *    Copyright   GNU Lesser General Public License
 *    
 * Arduino library for Gravity: Analog pH Sensor / Meter Kit V2, SKU: SEN0161-V2
 *    Copyright   [DFRobot](http://www.dfrobot.com), 2018
 *    Copyright   GNU Lesser General Public License
 *  
 *  
 * Software Environment: Arduino IDE 1.8.13
 * Software download link: https://www.arduino.cc/en/Main/Software
 *
 *
 * Hardware platform   : Arduino Bluno (on board bluetooth micro-controller)
 * Sensor pin:
 * Turbidity  : A0
 *        EC  : A1
 *        PH  : A2
 *        RTC : I2C
 * temperature: D5
 *
 *
 * SD card attached to SPI bus as follows:
 * Mega:  MOSI - pin 51, MISO - pin 50, CLK - pin 52, CS - pin 53
 * and pin #53 (SS) must be an output
 * M0:   Onboard SPI pin,CS - pin 4 (CS pin can be changed)
 *
 *
 * author  :  Lucas Colias (lucas.colias@student.csulb.edu) 
 * version :  V1.0
 * date    :  2020-10-06
 **********************************************************************/

#include <PubSubClient.h>

#include "GravityRtc.h"
///#include "SdService.h"

#include <WiFiNINA.h>
#include <ArduinoJson.h>

///#include <SD.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "OneWire.h"
#include "DFRobot_PH.h"
#include "DFRobot_EC.h"
#include <EEPROM.h>

//---INTERNET CONNECTION & CLIENT/SERVER VARIABLES-----------------------------------------------------------------
// Wifi connection variables
char ssid[] = "ATT5F7y3i8";        // YOUR WIFI SSID
char password[] = "2u9+4d4d2?9x";  // YOUR WIFI PASSWORD

// Server Information Variables 
char* hostname = "3.137.142.189"; // IP ADDRESS FOR THE SERVER
int port = 1883;                 // PORT CONNECTION NUMBER

// MQTT Client Variables
WiFiClient c;                           // CLIENT INSTANCE THAT CONNECTS THE ARDUINO TO THE SERVER
int connectionStatus = WL_IDLE_STATUS;  // CLIENT CONNECTION STATUS
PubSubClient client(c);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (256)
char msg[MSG_BUFFER_SIZE];
int value = 0;
const char* topic = "WaterQuality";

//---SENSOR VARIABLES----------------------------------------------------------------------------------------------
// Sensor Pins 
#define DS18S20_Pin 2                   // DIGITAL WIRE 2 - DS18S20
#define TURBIDITY_PIN A2                // ANALOG PIN 2 - TURBIDITY 
#define EC_PIN A1                       // ANALOG PIN 1 - ELECTIRCAL CONDUCTIVITY
#define PH_PIN A0                       // ANALOG PIN 2 - PH

// Turbidity sensor variables
float turbidityVoltage, turbidityValue;

// EC sensor variables
float ecVoltage,ecValue;
DFRobot_EC ec;

// PH sensor variables
float pHVoltage,phValue;
DFRobot_PH ph;

// Temperature sensor variables & chip i/o
OneWire ds(DS18S20_Pin);
DallasTemperature tSensors(&ds);
float tempC; 

// clock module
GravityRtc rtc;
String timestamp; 

//---JSON VARIABLES------------------------------------------------------------------------------------------------
unsigned long updateTime = 0;
const size_t capacity = JSON_OBJECT_SIZE(5);
StaticJsonDocument<capacity> doc;


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

//---SETUP---------------------------------------------------------------------------------------------------------
void setup() {
  
  // Starts the Serial Monitor.
	Serial.begin(115200);
//---WIFI----------------------------------------------------------------------------------------------------------
  // Begins the WiFi connection.
  WiFi.begin(ssid,password);
  Serial.print("Connecting to: "); Serial.println(ssid);

  // Waits for a connection and continuously prints the connection status...
  while (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(ssid,password);
    delay(5000);
    Serial.print("Wifi Status: "); Serial.println(WiFi.status());
  } 

  // Prints Confirmation of Connection with the device and gateway IP
  Serial.println("WiFi connected!");
  Serial.print("SSID: "); Serial.println(WiFi.SSID());
  
  IPAddress ip = WiFi.localIP();
  IPAddress gateway = WiFi.gatewayIP();
  Serial.print("Local IP address: "); Serial.println(ip);
  Serial.print("Gateway IP address: "); Serial.println(gateway); 
  delay(1000); 

//---CLIENT/SERVER-------------------------------------------------------------------------------------------------

  client.setServer(hostname, port);
  client.setCallback(callback);

  //connect();
  
  // Begins a client connection to the server
  //Serial.print("\n[Connecting to %s ... "); Serial.println(server);
  //connectionStatus = client.connect(server, port);
  //delay(1000);
  
  // If the client DOES connect then a confirmation message is printed and sent to the server. 
  // If the client DOES NOT connect then an errror messaage is printed with the conenction status
  //if(connectionStatus)
  //{
  //  Serial.println("Connection to Server completed...");
  //}
  //else
  //{
  //  Serial.print(F("Client unavailable, STATUS: ")); Serial.println(connectionStatus);
  //}
  
  // Start the DS18B20 sensor
  tSensors.begin();
 
	ec.begin();
  ph.begin();
  
  rtc.setup();
  //Set the RTC time manually
  //rtc.adjustRtc(2020,12,20,50,2,35,30);
  ///sdService.setup();
  ///sdService.update();
}

void loop() {
	
  
	// ************************* Serial debugging ******************
	if(millis() - updateTime > 10000)
	{
		updateTime = millis();

    rtc.read();

    // Collects DS18B120a temprature sensor reading(Displays to Serial Monitor for Debugging)
    tSensors.requestTemperatures(); 
    tempC = tSensors.getTempCByIndex(0);
        
    /// NEXT ITERATION WILL COLLECT THESE OTHER SENSORS DATA
    turbidityVoltage = analogRead(TURBIDITY_PIN) * (5.0 / 1024.0); // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
    turbidityValue = getTurbidity(turbidityVoltage);// read the input on analog pin 2:    
    
    ecVoltage = analogRead(EC_PIN)/1024.0*5000;  // read the voltage
    ecValue =  ec.readEC(ecVoltage,tempC); // convert voltage to EC with temperature compensation
    
    pHVoltage = analogRead(PH_PIN)/1024.0*5000;  // read the voltage
    phValue = ph.readPH(pHVoltage,tempC);  // convert voltage to pH with temperature compensation

    //Clear the JSON doc before inserting values
    doc.clear();     

    timestamp = (String)rtc.month + "," + (String)rtc.day + "," + (String)rtc.year + " " + (String)rtc.hour + ":" + (String)rtc.minute + ":" + (String)rtc.second;
    ///Serial.print(F("ºC , EC = ")); Serial.print(ecValue);
    ///Serial.print(F("ms/cm , pH = ")); Serial.print(phValue);
    //Serial.print(F("Turb = ")); Serial.print(turbidityVoltage); Serial.println("NTU, "); 
    //Serial.print(F("Temp = ")); Serial.print(tempC); Serial.print("ºC, "); 
    //Serial.print(timestamp); 
    //doc["timestamp"] = timestamp;
    //doc["Turbidity"] = turbidityValue;
    ///doc["pH"] = phValue;
    ///doc["EC"] = ecValue;
    //doc["Temprature"] = tempC;
    
    //serializeJson(doc,Serial); Serial.print("\n");
    /*
    if (!client.isConnected())
    {
      connect();
    }
    else
    {
    // Send and receive QoS 0 message
    char buf[1024]; 
    String temp = "{\"Timestamp\":" + timestamp + ",\"Temperature\":" + (String)tempC + ",\"pH\":" + phValue + ",\"EC\":" + (String)ecValue + ",\"Turbidity\":" + (String)turbidityValue + "}";
        
    strcpy(buf, temp.c_str());
    Serial.println(buf);
    message.qos = MQTT::QOS0;
    message.retained = false;
    message.dup = false;
    message.payload = (void*)buf;
    message.payloadlen = strlen(buf)+1;
    int rc = client.publish(topic, message);
    if (rc != 1)
    {
      Serial.print("rc from client publish is ");
      Serial.println(rc);
    }

    }
    /*
    // If the Arduino(Client) is connected to the server then... 
    if (client.connected()) {
      
      // Send the JSON document to the Server
      serializeJsonPretty(doc,client);
      //client.write("{\"Temperature\": 23.125}"); 
      
    } 
    else // If the Arduino(Client) is NOT connected to the server then...
    {

      // Stop the Client instance and print an error message with the current connection status.
      client.stop();
      Serial.print(F("Client connection failed, error: ")); Serial.println(connectionStatus);
      
      // Attempt to reconnect to the Server
      Serial.print("\n[reconnecting to %s ... "); Serial.println(server);
      connectionStatus = client.connect(server, port);
      delay(1000);
       
    }
    */

    if (!client.connected()) {
      reconnect();
    }
    client.loop();

    String temp = "{\"Timestamp\":" + timestamp + ",\"Temperature\":" + (String)tempC + ",\"pH\":" + phValue + ",\"EC\":" + (String)ecValue + ",\"Turbidity\":" + (String)turbidityValue + "}";
    ++value;
    strcpy(msg, temp.c_str());
    Serial.print("Publish message: ");
    Serial.print(msg);
    Serial.println(turbidityVoltage);
    client.publish(topic, msg);
  
    
	}
 
  ///ec.calibration(ecVoltage,temperature);  // calibration process by Serial CMD
  ///ph.calibration(pHVoltage,temperature);  // calibration process by Serial CMD 
}

//Converts the voltage to a unit of turbidity using a relationship function between the two
float getTurbidity(float voltage){
  return (-1120.4*voltage*voltage) + (5742.3*voltage) - 4352.9;
}
/*
void connect()
{
  Serial.print("Connecting to ");
  Serial.print(hostname);
  Serial.print(":");
  Serial.println(port);
 
  int rc = ipstack.connect(hostname, port);
  if (rc != 1)
  {
    Serial.print("rc from TCP connect is ");
    Serial.println(rc);
  }
 
  Serial.println("MQTT connecting");
  MQTTPacket_connectData data = MQTTPacket_connectData_initializer;       
  data.MQTTVersion = 3;
  data.clientID.cstring = (char*)"arduino-test";
  rc = client.connect(data);
  if (rc != 0)
  {
    Serial.print("rc from MQTT connect is ");
    Serial.println(rc);
  }
  Serial.println("MQTT connected");
  
  rc = client.subscribe(topic, MQTT::QOS2, messageArrived);   
  if (rc != 0)
  {
    Serial.print("rc from MQTT subscribe is ");
    Serial.println(rc);
  }
  Serial.println("MQTT subscribed");
}

void messageArrived(MQTT::MessageData& md)
{
  MQTT::Message &message = md.message;
  
  Serial.print("Message ");
  Serial.print(++arrivedcount);
  Serial.print(" arrived: qos ");
  Serial.print(message.qos);
  Serial.print(", retained ");
  Serial.print(message.retained);
  Serial.print(", dup ");
  Serial.print(message.dup);                
  Serial.print(", packetid ");
  Serial.println(message.id);
  Serial.print("Payload ");
  Serial.println((char*)message.payload);
}
*/
