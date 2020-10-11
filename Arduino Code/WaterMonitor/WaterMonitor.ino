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
#include "SdService.h"

#include <ArduinoJson.h>

#include <SD.h>
#include <Wire.h>
#include "OneWire.h"
#include "DFRobot_PH.h"
#include "DFRobot_EC.h"
#include <EEPROM.h>

//Define Pins for each sensor
#define DS18S20_Pin 5 //DS18S20 Signal pin on digital 5
#define TURBIDITY_PIN A0
#define EC_PIN A1
#define PH_PIN A2


//Turbidity sensor variables
float turbidityVoltage, turbidityValue;

//EC sensor variables
float ecVoltage,ecValue;
DFRobot_EC ec;

//pH sensor variables
float pHVoltage,phValue;
DFRobot_PH ph;

//Temperature sensor variables & chip i/o
OneWire ds(DS18S20_Pin);  // on digital pin 2
float temperature; 

// clock module
GravityRtc rtc;
String timestamp; 

// sensor monitor EC and Temp
//GravitySensorHub sensorHub;
//SdService sdService = SdService(sensorHub.sensors);
//PrintWriter output;


void setup() {
	Serial.begin(115200);
	ec.begin();
  ph.begin();
  
  rtc.setup();
  rtc.adjustRtc(F(__DATE__), F(__TIME__));
  //sdService.setup();

}

unsigned long updateTime = 0;
const size_t capacity = JSON_OBJECT_SIZE(5) + 70;

void loop() {
	
	//sdService.update();
  
	// ************************* Serial debugging ******************
	if(millis() - updateTime > 5000)
	{
		updateTime = millis();

    rtc.adjustRtc(F(__DATE__), F(__TIME__));

    temperature = getTemp(); // read your temperature sensor to execute temperature compensation

    turbidityVoltage = analogRead(A0) * (5.0 / 1024.0); // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
    turbidityValue = getTurbidity(turbidityVoltage);// read the input on analog pin 0:    
    
    ecVoltage = analogRead(EC_PIN)/1024.0*5000;  // read the voltage
    ecValue =  ec.readEC(ecVoltage,temperature); // convert voltage to EC with temperature compensation
    
    pHVoltage = analogRead(PH_PIN)/1024.0*5000;  // read the voltage
    phValue = ph.readPH(pHVoltage,temperature);  // convert voltage to pH with temperature compensation
    /*
    Serial.print(F("  Temp = "));
    Serial.print(temperature);
    Serial.print(F("*C  EC = "));
    Serial.print(ecValue);
    Serial.print(F("ms/cm  pH = "));
    Serial.print(phValue);

    
    Serial.print(F("  Turbidity = ")); // print out the value you read:
    Serial.print(turbidityVoltage); // print out the value you read:
    Serial.println("NTU"); 
    */

    timestamp = (String)rtc.month + "," + (String)rtc.day + "," + (String)rtc.year + " " + (String)rtc.hour + ":" + (String)rtc.minute + ":" + (String)rtc.second;     
        
    
	  DynamicJsonDocument doc(capacity);

    doc["timestamp"] = timestamp;
    doc["Temprature"] = temperature;
    doc["Turbidity"] = turbidityValue;
    doc["pH"] = phValue;
    doc["EC"] = ecValue;
    
    serializeJson(doc,Serial); 
	  
	}
 
  ec.calibration(ecVoltage,temperature);  // calibration process by Serail CMD
  ph.calibration(pHVoltage,temperature);  // calibration process by Serail CMD 
  
}



//* ***************************** Print the relevant debugging information ************** ************ * /
// Note: Arduino M0 need to replace Serial with SerialUSB when printing debugging information

// ************************* Serial debugging ******************
//Serial.print("ph= ");
//Serial.print(sensorHub.getValueBySensorNumber(0));
//Serial.print("  Temp= ");
//Serial.print(sensorHub.getValueBySensorNumber(1));
//Serial.print("  Orp= ");
//Serial.println(sensorHub.getValueBySensorNumber(4));
//Serial.print("  EC= ");
//Serial.println(sensorHub.getValueBySensorNumber(3));


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

float getTemp(){
  //returns the temperature from one DS18S20 in DEG Celsius

  byte data[12];
  byte addr[8];

  if ( !ds.search(addr)) {
      //no more sensors on chain, reset search
      ds.reset_search();
      return -1000;
  }

  if ( OneWire::crc8( addr, 7) != addr[7]) {
      Serial.println("CRC is not valid!");
      return -1000;
  }

  if ( addr[0] != 0x10 && addr[0] != 0x28) {
      Serial.print("Device is not recognized");
      return -1000;
  }

  ds.reset();
  ds.select(addr);
  ds.write(0x44,1); // start conversion, with parasite power on at the end

  byte present = ds.reset();
  ds.select(addr);
  ds.write(0xBE); // Read Scratchpad


  for (int i = 0; i < 9; i++) { // we need 9 bytes
    data[i] = ds.read();
  }

  ds.reset_search();

  byte MSB = data[1];
  byte LSB = data[0];

  float tempRead = ((MSB << 8) | LSB); //using two's compliment
  float TemperatureSum = tempRead / 16;

  return TemperatureSum;

}
