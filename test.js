const { Builder, By, until } = require("selenium-webdriver");
async function testLogin() {
    let driver = await new Builder()
        .forBrowser("chrome")
        .build();
    try {
        // Open index.html
        await driver.get(
            "file:///C:/Users/notam/Desktop/Muteeb/index.html"
        );
        // Wait for username field
        let username = await driver.wait(
            until.elementLocated(By.id("username")),
            10000
        );
        // Enter username
        await username.sendKeys("admin");
        // Enter password
        let password = await driver.findElement(
            By.id("password")
        );
        await password.sendKeys("1234");
        // Click Login
        let loginButton = await driver.findElement(
            By.id("loginButton")
        );
        await loginButton.click();
        // Get result
        let message = await driver.wait(
            until.elementLocated(By.id("message")),
            5000
        );
        let result = await message.getText();
        console.log("--------------------------------");
        console.log("Expected Result: Login Successful");
        console.log("Actual Result: " + result);
        if (result === "Login Successful") {
            console.log("TEST PASSED");
        } else {
            console.log("TEST FAILED");
        }
        console.log("--------------------------------");
        console.log("Result page will remain open for 10 seconds...");
        // Keep Chrome open for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
        console.log("TEST ERROR:");
        console.log(error.message);
    } finally {
        await driver.quit();
        console.log("Browser closed.");
    }
}
testLogin();