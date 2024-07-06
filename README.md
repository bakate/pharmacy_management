# Pharmacy Management System

## Project Overview

This project involves the refactoring and enhancement of an existing **Pharmacy** Management System. The original system manages various types of **drugs** with specific rules for expiration and benefit values. My task was to improve the code structure, implement new features, and ensure the system's extensibility for future updates.

## Key Features Implemented

- Refactored the existing codebase to improve readability and maintainability.
- Implemented the Strategy pattern to handle different drug update logics.
- Added support for a new drug type: "Dafalgan".
- Ensured all existing and new drug types adhere to the specified rules.
- Maintained backwards compatibility with the existing public API.

## Technical Specifications

The system manages drugs with the following properties:
- `expiresIn`: Number of days until the drug expires.
- `benefit`: Value indicating the drug's potency.

Key Rules:
- The Benefit degrades twice as fast after expiration.
- The Benefit is never negative and never exceeds 50.
- Special drugs ("Herbal Tea", "Magic Pill", "Fervex", "Dafalgan") have unique update rules.
  - "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date
  - "Magic Pill" never expires nor decreases in Benefit.
  - "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches. Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Benefit drops to 0 after the expiration date.
  - "Dafalgan" degrades in Benefit twice as fast as normal drugs

## Code Structure

- `Drug` class: Represents individual drugs.
- `Pharmacy` class: Manages the collection of drugs and their updates.
- Strategy classes: Implement specific update logic for each drug type.

## Testing

To ensure the system's correctness, I've implemented comprehensive unit tests and maintained compatibility with the existing simulation output. You can run the tests using:

```sh
npm test
