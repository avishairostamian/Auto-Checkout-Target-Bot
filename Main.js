/*************************************************************************
 * 
 * AVISHAI ROSTAMIAN CONFIDENTIAL
 * __________________
 * Created by Avishai Rostamian 11/28/20
 * Copyright © 2020 Avishai Rostamian. All rights reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Avishai Rostamian and suppliers,
 * if any. The intellectual and technical concepts contained
 * herein are proprietary to Avishai Rostamian
 * and suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained  
 * from Avishai Rostamian.
 */

const prompt = require('prompt-sync')();
const URL = prompt('Enter URL: ');
console.clear();


const puppeteer = require('puppeteer');

(async function main(){
  try{
     //**** Launch Puppeteer and Headless Chrome  ******/
      const browser = await puppeteer.launch({headless: false, defaultViewport: null, slowMo: 1});   
      const page = await browser.newPage();   

      page.setUserAgent('Insert User Agent');

      //******* Loop refreshing page until product found *******/
      await page.goto(URL, {waitUntil: 'networkidle0'});
      while (true){
      try{
        await page.waitForSelector('div > .styles__BaseWrapper-sc-11r1it6-0:nth-child(3) > .Row-uds8za-0 > .Col-favj32-0 > .Button__ButtonWithStyles-y45r97-0', {timeout: 1000});
         console.log("Adding to cart..");
         break;
        }
      catch (er){ console.log("Product not found, refreshing..");
      await page.reload({ waitUntil: "networkidle0" });
        }
      }   
     //**** Ship it / add to cart *****/
      await page.click('div > .styles__BaseWrapper-sc-11r1it6-0:nth-child(3) > .Row-uds8za-0 > .Col-favj32-0 > .Button__ButtonWithStyles-y45r97-0')
     
      //**** Decline Coverage button ****/
      await page.waitForSelector('div > .h-display-flex > .Row-uds8za-0 > .Col-favj32-0:nth-child(2) > .Button-bwu3xu-0')
      await page.click('div > .h-display-flex > .Row-uds8za-0 > .Col-favj32-0:nth-child(2) > .Button-bwu3xu-0')
     
      //***** Go to cart link *****/
      await page.goto('https://www.target.com/co-cart');

      page.waitForNavigation();
      console.log("Checking out..");

      //***** Press continue to checkout ******/
      await page.waitForSelector('#orderSummaryWrapperDiv > .sticky-outer-wrapper > .sticky-inner-wrapper > .h-padding-h-tight > .Button__ButtonWithStyles-y45r97-0')
      await page.click('#orderSummaryWrapperDiv > .sticky-outer-wrapper > .sticky-inner-wrapper > .h-padding-h-tight > .Button__ButtonWithStyles-y45r97-0')
      
      //***** Sign in *******/
      console.log("Signing in..");
      await page.waitForSelector('#username', {visible: true,});

      await page.type('#username', 'test@gmail.com');

      await page.type('#password', 'test!',);
      
      await page.click('#login');

      await page.waitForNavigation();

      //################################ NEW ACCOUNTS ONLY #############################//
      //**** Decline Premiun acc *****/
      /*
      try{
      await page.waitForSelector('#viewport > #interstitial-login-page #circle-skip',{timeout: 2000});
      await page.click('#viewport > #interstitial-login-page #circle-skip')
      }
      catch (r){
        console.log("Checkpoint 0");
      }
      */
     //**** Confirm address ******/
     /*
      try{
      await page.waitForSelector('.Col-favj32-0 > .styles__GreyBorderAddress-kpb2lg-1 > .Radio__RadioOuterWrap-sc-1sog84z-0 > .Radio__RadioWrap-sc-1sog84z-3 > .Radio__RadioVisual-sc-1sog84z-5',{timeout: 1000})
      await page.click('.Col-favj32-0 > .styles__GreyBorderAddress-kpb2lg-1 > .Radio__RadioOuterWrap-sc-1sog84z-0 > .Radio__RadioWrap-sc-1sog84z-3 > .Radio__RadioVisual-sc-1sog84z-5')
      console.log("Confirming address..");
      await page.waitForSelector('div > .Col-favj32-0 > .Row-uds8za-0 > .Col-favj32-0 > .Button__ButtonWithStyles-y45r97-0')
      await page.click('div > .Col-favj32-0 > .Row-uds8za-0 > .Col-favj32-0 > .Button__ButtonWithStyles-y45r97-0')
      }
      catch (rr){
        console.log("Checkpoint 1");
      }*/
        /*
      await page.waitForSelector('#full_name', {
          visible: true,
      });
      
      await page.type('#full_name', 'Test test',);
      
      await page.type('#address_line1', '1 North Street',);
        
      await page.type('#zip_code', '11355',);
      
      await page.type('#city', 'Flushing',);
      
      await page.select('#state', 'NY')
      
      await page.type('#mobile', '123 456 7890',);
      
      
      
      const [button] = await page.$x("//button[contains(., 'Save & continue')]");
      if (button) {
         await button.click();
      }
      
      await page.waitForNavigation();
      */

     //**** Input card details and press confirm ******/
      await new Promise(r => setTimeout(r, 1000));
      await page.waitForNavigation();
      console.log("Entering Card Info..");
      await new Promise(r => setTimeout(r, 2000));
      await page.waitForSelector('#creditCardInput-cardNumber');
      await page.type('#creditCardInput-cardNumber', '0000000',);
      await page.click('.Col-favj32-0 > form > .Row-uds8za-0 > .Col-favj32-0 > .Button-bwu3xu-0');
      
     //**** Enter CVV and continue */

      await page.waitForSelector('#creditCardInput-cvv', {visible: true,});
      
      await page.type('#creditCardInput-cvv', '000',);    //1120

      await page.waitForSelector('.h-margin-b-default > .Col-favj32-0 > .Row-uds8za-0 > .Col-favj32-0 > .Button-bwu3xu-0')
      await page.click('.h-margin-b-default > .Col-favj32-0 > .Row-uds8za-0 > .Col-favj32-0 > .Button-bwu3xu-0')

      //################################ NEW ACCOUNTS ONLY #############################//
      //await page.type('#creditCardInput-cvv', '000',);
      
      //await page.type('#creditCardInput-cardName', 'Test test',);
      /*
      const [button2] = await page.$x("//button2[contains(., 'Save and continue')]");
      if (button2) {
         await button2.click();
      }
      const [button3] = await page.$x("//button3[contains(., 'Place your order')]");
      if (button3) {
         await button3.click();
      }
      */

      //*** Place order *****/
      await new Promise(r => setTimeout(r, 4000));
      console.log("Placing order..");
      await page.waitForSelector('.sticky-outer-wrapper > .sticky-inner-wrapper > .h-padding-h-tight > .Row__StyledRow-sc-19ydihw-0 > .Button__ButtonWithStyles-y45r97-0');
      console.log("Order placed!");

      
  }

  catch(e){
      console.log('Error: ', e);
  }
})();
