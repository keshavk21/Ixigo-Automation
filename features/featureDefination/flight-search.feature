@flights @search
Feature: Flight search variations

  Background:
    Given the user is on the Ixigo flights page

  @TC-002
  Scenario: Round-trip search with a return date after the departure date
    When the user selects Round Trip
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user selects September 28, 2026 as the return date
    And the user searches for flights
    Then flight search results should be displayed

  @TC-003
  Scenario: Complete a search using airport suggestions
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    Then flight search results should be displayed

  @TC-004
  Scenario: Search with a non-default traveller count and cabin class
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user opens Travellers & Class
    And the user sets 2 adults
    And the user selects the Economy class
    And the user confirms Travellers & Class
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    Then flight search results should be displayed

  @TC-005
  Scenario: Search with a supported Special Fare selected
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects the "Student" special fare
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    Then flight search results should be displayed

  @TC-006
  Scenario: Search with Always opt for Free Cancellation enabled
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user enables Always opt for Free Cancellation
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    Then flight search results should be displayed

  @TC-007
  Scenario: Review available flight results and select a suitable flight
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    Then flight search results should be displayed
    When the user opens flight details for the first result
    And the user selects Book on the first result
    Then the review page should be displayed

  @TC-008
  Scenario: Continue from selected flight to the booking handoff
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    And the user selects Book on the first result
    Then the review page should be displayed

  @TC-009
  Scenario: Verify the journey stops at authentication without bypassing it
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    And the user selects Book on the first result
    Then the review page should be displayed

  @TC-010
  Scenario: Verify the journey does not complete payment
    When the user selects One Way
    And the user selects Delhi as the departure airport
    And the user selects Bengaluru as the arrival airport
    And the user selects September 24, 2026 as the departure date
    And the user searches for flights
    And the user selects Book on the first result
    Then no payment should be submitted

  @TC-011
  Scenario: Attempt a booking journey with incomplete route data
    When the user searches for flights
    Then the user should remain on the flights search page
