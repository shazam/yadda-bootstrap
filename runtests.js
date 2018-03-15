/**
 * Copyright 2012 Shazam Entertainment Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

var glob = require('glob');
var Yadda = require('yadda');
Yadda.plugins.mocha();

var libraries = stepDefs().reduce(importStepDef, []);
var context = require('./weblibrary').library.init();
var yadda = new Yadda.Yadda(libraries, context); 

featureFiles().forEach(function(file) {
    feature(file, function(feature) {
        scenarios(feature.scenarios, function(scenario, done) {         
            yadda.yadda(scenario.steps, done);
        })
    })
});

function featureFiles() {
	return glob.sync("features/**/*.feature");
}

function stepDefs() {
	return glob.sync("stepdefs/**/*.js")
};

function importStepDef(stepdefs, stepdef) {
	var fileName = stepdef.replace('.js', '');
    var library = require('./' + fileName);
	return stepdefs.concat(library);
};