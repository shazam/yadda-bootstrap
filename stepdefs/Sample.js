/**
 * Copyright 2012 Shazam Entertainment Limited
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * 
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
var webdriver = require('selenium-webdriver');
var assert = require('selenium-webdriver/testing/assert');
var library = new require('yadda').localisation.English();

module.exports = library

	.given("I am on google", function(next) {
		this.driver.get("http://www.google.co.uk")
		.then(function() {
			next();
		});
	})

	.when("I search for $query", function(query, next) {
		this.driver.findElement(webdriver.By.css("#gbqfq")).sendKeys(query);
		this.driver.findElement(webdriver.By.css("#gbqfb")).click().then(function() {
			next();
		});
	})

	.then("I should see the yadda github in the results", function(next) {
		this.driver.findElement(webdriver.By.css("cite")).getText().then(function(text) {
			assert(text).contains("https://github.com/acuminous/");
			next();
		});
	});
