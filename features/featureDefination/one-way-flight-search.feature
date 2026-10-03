@flights
Feature: One-way flight search

  Scenario: TC-001
    Given the user is on the Ixigo flights page
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    Then flight search results should be displayed