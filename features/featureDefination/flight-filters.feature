@flights @filters
Feature: Flight results filtering and sorting

  Background:
    Given the user is on the Ixigo flights page
    And the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    And flight search results should be displayed

  @TC-012
  Scenario: Filter by number of stops
    When the user filters results by the "Non-Stop" stop count
    Then flight search results should be displayed
    When the user clears the "Non-Stop" stop count filter
    Then flight search results should be displayed

  @TC-013
  Scenario: Filter by airline
    When the user filters results by the "Air India" airline
    Then flight search results should be displayed
    When the user clears the "Air India" airline filter
    Then flight search results should be displayed

  @TC-014
  Scenario: Filter by Flight Price range
    When the user adjusts the flight price range
    Then flight search results should be displayed

  @TC-015
  Scenario: Filter by Flight Duration range
    When the user adjusts the flight duration range
    Then flight search results should be displayed


  @TC-017
  Scenario: Horizontally scroll date-price strips and select a date
    When the user scrolls the date-price strip
    And the user selects "Fri, 25 Sep" from the date-price strip
    Then flight search results should be displayed

  @TC-018
  Scenario: Sort flight cards by price, fastest, departure, and smart modes
    When the user sorts results by "Price"
    Then flight search results should be displayed
    When the user sorts results by "Fastest"
    Then flight search results should be displayed
    When the user sorts results by "Departure"
    Then flight search results should be displayed
    When the user sorts results by "Smart"
    Then flight search results should be displayed

  @TC-021
  Scenario: Select a Bank Offer and verify its detail
    When the user selects a bank offer
    Then the bank offer details should be visible
