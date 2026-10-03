@flights @misc
Feature: Miscellaneous site checks

  Background:
    Given the user is on the Ixigo flights page

  @TC-029
  Scenario: Verify header navigation links
    Then the "Flights" header navigation link should be visible
    And the "Hotels" header navigation link should be visible
    And the "Trains" header navigation link should be visible
    And the "Buses" header navigation link should be visible
    When the user clicks the "Trains" header navigation link
    Then the browser should navigate to a page containing "/trains"

  @TC-030
  Scenario: Verify promotional/offer banners render correctly
    Then a promotional banner should be visible

  @TC-031
  Scenario: Verify footer links
    Then the "About Us" footer link should be visible
    When the user clicks the "About Us" footer link
    Then the browser should navigate to a page containing "/about"

