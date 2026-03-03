# CalendarPage Module

## Responsibility Split

- `ui/CalendarPage.tsx`
  - Orchestrates hooks and composes UI blocks.
  - Contains no rendering-specific FullCalendar logic and no domain calculations.

- `ui/CalendarBoard.tsx`
  - Encapsulates FullCalendar configuration and wiring.
  - Receives prepared data/handlers via props.

- `ui/CalendarSidebar.tsx`
  - Desktop-only secondary panel (mini calendar + status chips).

- `ui/CalendarModals.tsx`
  - Modal composition for create/details/edit/confirm flows.

- `model/useCalendarViewController.tsx`
  - View navigation state, view switching, date click behavior, header/slot renderers.

- `model/useCalendarEventsSync.ts`
  - Loads and adapts backend events to FullCalendar format.

- `model/useCalendarFormModalState.ts`
  - Keeps create/details/edit modal state and transitions.

- `model/useChangeCalendarEvent.ts`
  - Handles drag/resize updates and recurring update strategy.

- `model/useDayViewScrollTime.ts`
  - Computes and applies day-view initial scroll target.

- `model/useCalendarEventPresentation.tsx`
  - Centralizes event content rendering and class assignment per view.

- `lib/isMonthLikeView.ts`
  - Shared view classification utility.

- `lib/dayViewScrollTime.ts`
  - Pure calculation for first-event-based day scroll time.

- `lib/calendar.constants.ts`
  - Calendar behavior constants (slot sizes, day row limits, delays).

## Notes

- Keep domain calculations in `lib/` or dedicated `model` hooks.
- Keep UI components declarative and prop-driven.
- Add new FullCalendar display rules to `useCalendarEventPresentation` first.

## Style Notes

- All calendar styling lives in `ui/styles.css` and is grouped by sections:
  - tokens
  - shell/layout
  - base FullCalendar overrides
  - event variants (`default`, `month`, `list`)
  - responsive rules
- Event text color is controlled via `--fc-event-text-color`.
  - Base event chip text uses `.us-event` descendants.
  - List view text/time are intentionally overridden in `.us-event-list`.
