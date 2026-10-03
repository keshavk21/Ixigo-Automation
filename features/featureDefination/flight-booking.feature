@flights @booking
Feature: Flight booking handoff and policies

  Background:
    Given the user is on the Ixigo flights page
    And the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    And flight search results should be displayed

  @TC-019
  Scenario: Inspect flight details and continue through Book handoff
    When the user selects Book on the first result
    Then the review page should be displayed

  @TC-022
  Scenario: View the Cancellation policy from Flight Details
    When the user selects Book on the first result
    Then the review page should be displayed
    When the user opens the cancellation policy
    Then the cancellation policy should be visible

  @TC-023
  Scenario: View the Rescheduling policy from Flight Details
    When the user selects Book on the first result
    Then the review page should be displayed
    When the user opens the rescheduling policy
    Then the rescheduling policy should be visible

  @TC-024
  Scenario: Use Lock Price to hold the current fare
    When the user locks the price on the first result
    Then the lock price terms should be visible
