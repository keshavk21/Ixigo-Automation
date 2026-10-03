@flights @tracker
Feature: Flight Tracker

  @TC-025
  Scenario: Search a flight by flight number in Flight Tracker
    Given the user is on the Flight Tracker page
    When the user searches Flight Tracker by flight number "AI-101"
    Then live flight status details should be displayed

  @TC-026
  Scenario: Search a flight by route and date in Flight Tracker
    Given the user is on the Flight Tracker page
    When the user searches Flight Tracker by route "Delhi" to "Mumbai" on "Today"
    Then live flight status details should be displayed
