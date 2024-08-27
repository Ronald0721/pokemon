Feature: Pokemon View

    Scenario: User views Pokemon View Page
        Given User navigates to the Pokemon view page
        When the Pokemon data is fetched successfully
        Then User will see the Pokemon's name and image
