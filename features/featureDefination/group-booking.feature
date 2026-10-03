@flights @groupbooking
Feature: Group Booking

  Background:
    Given the user is on the Group Booking page

  @TC-027
  Scenario: Submit a valid Group Booking request
    When the user fills the group booking route from "Delhi" to "Mumbai"
    And the user selects group booking departure date
    And the user sets the group traveller count to 10
    And the user fills group booking contact details
    And the user submits the group booking request
    Then the group booking confirmation should be displayed

  @TC-028
  Scenario: Submit an incomplete Group Booking form
    When the user fills the group booking route from "Delhi" to "Mumbai"
    And the user selects group booking departure date
    And the user sets the group traveller count to 10
    And the user fills group booking contact details
    And the user leaves the group booking contact number empty
    And the user submits the group booking request
    Then the group booking form validation should block submission
