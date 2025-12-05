# CLAUDE.md

## Project Overview

ПОЛАТИ БАЛЛЫ (Polati Points) - Interactive calculator for modeling the "POLATI POINTS" employee loyalty program. Calculates economic effects considering inflation, rate indexation, and various employee behavior scenarios.

## Language

- Project documentation and UI: Russian
- Code: English (if implemented)

## Technical Stack (Planned)

- React + TypeScript (preferred) or HTML + Tailwind CSS + JavaScript
- Recharts or Chart.js for graphs
- PapaParse for CSV handling
- jsPDF for PDF export (optional)

## Key Concepts

### Core Program Rules
- **Point Rate**: 1 point = 1 ruble (fixed)
- **Budget**: 1% of employee's annual salary
- **Points never expire**: unlimited accumulation

### Main Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| `base_salary` | 1,200,000 | Base annual salary (rubles) |
| `budget_percent` | 1.0 | Percentage of salary for program |
| `inflation_rate` | 15.0 | Annual inflation (%) |
| `indexation_period` | 3 | Indexation period (years) |
| `indexation_coefficient` | 1.52 | Indexation multiplier |
| `simulation_years` | 5 | Modeling period (years) |

## Key Formulas

### Salary with Inflation
```
salary[year] = base_salary × (1 + inflation_rate)^(year - 1)
```

### Budget Calculation
```
budget[year] = salary[year] × budget_percent / 100
```

### Indexed Points
```
indexed_points = round(base_points × indexation_coefficient, -1)
```

## Data Files Structure

```
data/
├── tasks.csv              # Task definitions with points
├── catalog.csv            # Product catalog with prices
├── settings.csv           # Default settings
└── employee_patterns.csv  # Accrual patterns by year
```

## Validation Rules

- Budget deviation must be ≤ 2%
- Cumulative total must be ≥ cumulative budget each year
- Annual total must cover reference item price (purchasing power check)

## Development Notes

- All calculations must handle rounding properly (to tens for points, to 100 for allowances)
- Indexation applies only after `indexation_period` years
- Reference item: "Сумка" (bag) at 10,499 points base price
