/**
 * Copyright 2012 Shazam Entertainment Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

var Yadda = require('yadda').Yadda;
require('yadda').plugins.mocha();
var glob = require('glob');
var Library = require('yadda').localisation.English;
var library = new Library();

var context = {};
var webcontext = require('./weblibrary').library.init(context);
var yadda = new Yadda(library, context);

stepDefs().forEach(importStepDef);
featureFiles().forEach(executeFeature);

function featureFiles() {
	return glob.sync("features/**/*.feature");
}

function stepDefs() {
	return glob.sync("stepdefs/**/*.js")
};

function importStepDef(stepdef) {
	var fileName = stepdef.replace('.js', '');
	require('./' + fileName).steps.using(library, context);
};

function executeFeature(featureFile) {
	yadda.mocha('Bootstrap', featureFile);
};
