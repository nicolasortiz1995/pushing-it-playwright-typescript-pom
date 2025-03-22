Feature: User Registration on PushingIT

  Background:
    Given the user navigates to the homepage

  @happy-path @register
  Scenario: Successful registration of a new user
    When the user enters valid registration details
    Then the system displays a message or state confirming successful registration
