/**
 * Copyright 2012 Shazam Entertainment Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
var context;
var webdriver = require('selenium-webdriver');

var weblibrary = {
	init: function() {
		var context = {};
	
		// mocha lifecycle operations
		function initBrowser(done) {
			var driver = new webdriver.Builder()
				.usingServer()
				.withCapabilities({'browserName': 'chrome'})
				.build();
			driver.manage().timeouts().implicitlyWait(15000);
			context.driver = driver;
			done();
		}
	
		function shutdownBrowser(done) {
			context.driver.quit().then(function() {
				done();
			});
		}
	
		before(initBrowser);
		after(shutdownBrowser);

		return context;
	}
};

exports.library = weblibrary;

