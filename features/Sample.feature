Feature: Sample feature to illustrate Yadda/Mocha/WebDriverJS

Scenario: Google for Yadda
Given I am on google
When I search for "yadda BDD"
Then I should see the yadda github in the results
