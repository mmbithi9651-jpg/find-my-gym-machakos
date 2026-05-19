# Implementation Plan - Find_My_Gym (Machakos)

A web application to locate gyms in Machakos, book sessions, buy merchandise, and get directions.

## Scope Summary
- **Gym Discovery**: List of gyms in Machakos with search and filter functionality.
- **Gym Details**: Detailed view for each gym including services, pricing, and location.
- **Booking System**: Interface to book workout sessions (client-side state).
- **Merchandise Store**: Simple catalog of gym-related merch with a shopping cart.
- **Directions**: Integration with Google Maps (external links) for directions.
- **Authentication**: Client-side "mock" login/signup for user personalization.

## Non-Goals
- Server-side persistence (no database/Supabase).
- Real payment processing (simulated checkout).
- Real-time location tracking (static location data for Machakos).

## Assumptions & Open Questions
- Data for gyms in Machakos will be hardcoded in a local constant file.
- User data and bookings will be stored in `localStorage`.
- "Directions" will simply open Google Maps in a new tab with the gym's coordinates.

## Affected Areas
- **Frontend**: All UI components (Shadcn UI), routing (React Router), and state management.
- **Data Layer**: Mock gym data and local storage wrappers.

## Phase 1: Setup & Data Modeling (frontend_engineer)
- Install dependencies: `react-router-dom`, `lucide-react`.
- Create a data file `src/data/gyms.ts` with mock gym data for Machakos (names, descriptions, coordinates, sessions, merch).
- Set up basic routing structure.

## Phase 2: Core UI & Layout (frontend_engineer)
- Implement `Navbar` and `Footer`.
- Create `Home` page with a hero section and "Featured Gyms".
- Create `GymList` page with filtering (by category: crossfit, yoga, etc.).

## Phase 3: Gym Details & Booking (frontend_engineer)
- Create `GymDetail` page showing description, images, and session booking options.
- Implement a `BookingModal` that saves to `localStorage`.

## Phase 4: Merchandise Store (frontend_engineer)
- Create a `Store` page displaying merchandise from all gyms or specific gyms.
- Implement a simple `Cart` drawer/page.

## Phase 5: Authentication & Profile (frontend_engineer)
- Create `Login` and `Signup` mock pages.
- Create `Profile` page to view "My Bookings" and "My Orders".

## Phase 6: Refinement & Directions (quick_fix_engineer)
- Add "Get Directions" buttons that link to Google Maps.
- Final styling polish and responsive checks.
- Add toast notifications for bookings/purchases.

## Sequencing Constraints
- Phase 1 is a prerequisite for all others.
- Phase 2 & 3 are high priority for core value.
- Phase 4 & 5 can be developed in parallel after Phase 1.
