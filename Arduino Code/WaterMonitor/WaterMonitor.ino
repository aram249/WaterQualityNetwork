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
const char* server = "34.69.136.100";   // IP ADDRESS FOR THE CLOUD SERVER
const int port = 54000;                 // PORT CONNECTION NUMBER

// Client Insrtance and Information Variables
WiFiClient client;                      // CLIENT INSTANCE THAT CONNECTS THE ARDUINO TO THE SERVER
int connectionStatus;                   // CLIENTS CONNECTION STATUS

//---SENSOR VARIABLES----------------------------------------------------------------------------------------------
// Sensor Pins 
#define DS18S20_Pin 2                   // DIGITAL WIRE 2 - DS18S20
#define TURBIDITY_PIN A2                // ANALOG PIN 2 - TURBIDITY 
///#define EC_PIN A1                       // ANALOG PIN 1 - ELECTIRCAL CONDUCTIVITY
///#define PH_PIN A0                       // ANALOG PIN 2 - PH

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
  // Begins a client connection to the server
  Serial.print("\n[Connecting to %s ... "); Serial.println(server);
  connectionStatus = client.connect(server, port);
  delay(1000);
  
  // If the client DOES connect then a confirmation message is printed and sent to the server. 
  // If the client DOES NOT connect then an errror messaage is printed with the conenction status
  if(connectionStatus)
  {
    Serial.println("Connection to Server completed...");
  }
  else
  {
    Serial.print(F("Client unavailable, STATUS: ")); Serial.println(connectionStatus);
  }
  
  // Start the DS18B20 sensor
  tSensors.begin();
 
	///ec.begin();
  ///ph.begin();
  
  rtc.setup();
  //Set the RTC time manually
  //rtc.adjustRtc(2020,12,20,50,2,35,30);
  ///sdService.setup();
  ///sdService.update();
}

void loop() {
	
  
	// ************************* Serial debugging ******************
	if(millis() - updateTime > 5000)
	{
		updateTime = millis();

    rtc.read();

    // Collects DS18B120a temprature sensor reading(Displays to Serial Monitor for Debugging)
    tSensors.requestTemperatures(); 
    tempC = tSensors.getTempCByIndex(0);
        
    /// NEXT ITERATION WILL COLLECT THESE OTHER SENSORS DATA
    turbidityVoltage = analogRead(TURBIDITY_PIN) * (5.0 / 1024.0); // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
    ///turbidityValue = getTurbidity(turbidityVoltage);// read the input on analog pin 0:    
    
    ///ecVoltage = analogRead(EC_PIN)/1024.0*5000;  // read the voltage
    ///ecValue =  ec.readEC(ecVoltage,temperature); // convert voltage to EC with temperature compensation
    
    ///pHVoltage = analogRead(PH_PIN)/1024.0*5000;  // read the voltage
    ///phValue = ph.readPH(pHVoltage,temperature);  // convert voltage to pH with temperature compensation

    //Clear the JSON doc before inserting values
    doc.clear();     

    timestamp = (String)rtc.month + "," + (String)rtc.day + "," + (String)rtc.year + " " + (String)rtc.hour + ":" + (String)rtc.minute + ":" + (String)rtc.second;
    ///Serial.print(F("ºC , EC = ")); Serial.print(ecValue);
    ///Serial.print(F("ms/cm , pH = ")); Serial.print(phValue);
    ///Serial.print(F(" , Turbidity = ")); Serial.print(turbidityVoltage); Serial.println("NTU"); 
    Serial.print(tempC); Serial.print("ºC, "); 
    Serial.print(timestamp); 
    doc["timestamp"] = timestamp;
    ///doc["Turbidity"] = turbidityValue;
    ///doc["pH"] = phValue;
    ///doc["EC"] = ecValue;
    doc["Temprature"] = tempC;
    
    serializeJson(doc,Serial); Serial.print("\n");

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
    
    
	}
 
  ///ec.calibration(ecVoltage,temperature);  // calibration process by Serial CMD
  ///ph.calibration(pHVoltage,temperature);  // calibration process by Serial CMD 
}

// ************************************************************ time ********************** **********
//Serial.print("   Year = ");//year
//Serial.print(rtc.year);
//Serial.print("   Month = ");//month
//Serial.print(rtc.month);
//Serial.print("   Day = ");//day
//Serial.print(rtc.day);
//Serial.print("   Week = ");//week
//Serial.print(rtc.week);
//Serial.print("   Hour = ");//hour
//Serial.print(rtc.hour);
//Serial.print("   Minute = ");//minute
//Serial.print(rtc.minute);
//Serial.print("   Second = ");//second
//Serial.println(rtc.second);

//Converts the voltage to a unit of turbidity using a relationship function between the two
float getTurbidity(float voltage){
  return -1129.4*voltage*voltage + 5742.3*voltage - 4352.9;
}
