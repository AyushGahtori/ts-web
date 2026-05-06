import type { ReactElement } from "react";
import type { IndustryIconKey, IndustryTableCell, IndustryTableRow, OutcomeIconKey } from "@/modules/landing/sections/industry-excellence/industryData";
import styles from "./IndustryExcellence.module.css";

interface IndustryTableProps {
  columns: string[];
  rows: IndustryTableRow[];
}

const industryIconMap: Record<IndustryIconKey, ReactElement> = {
  bfsi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10.5H21" />
      <path d="M7 15.5H10" />
    </svg>
  ),
  pharma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H15" />
      <path d="M10 3V8L5.5 18.5A2 2 0 0 0 7.34 21H16.66A2 2 0 0 0 18.5 18.5L14 8V3" />
      <path d="M8.5 13H15.5" />
    </svg>
  ),
  telecom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4V20" />
      <path d="M5 20L12 11L19 20" />
      <path d="M8.25 8.5A6 6 0 0 1 15.75 8.5" />
      <path d="M6 5.75A9 9 0 0 1 18 5.75" />
    </svg>
  ),
  oil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18H21" />
      <path d="M6 18V12L12 9V18" />
      <path d="M12 9L18 12V18" />
      <path d="M6 12L3.5 9.5" />
      <path d="M18 12L20.5 9.5" />
    </svg>
  ),
  manufacturing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20V11L8 14V9L13 12V7L21 11V20" />
      <path d="M3 20H21" />
      <path d="M6.5 17H7.5" />
      <path d="M11 17H12" />
      <path d="M15.5 17H16.5" />
    </svg>
  ),
};

const outcomeIconMap: Record<OutcomeIconKey, ReactElement> = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L18.5 5.5V11.5C18.5 16 15.75 19.88 12 21C8.25 19.88 5.5 16 5.5 11.5V5.5L12 3Z" />
      <path d="M9.5 12.5L11.25 14.25L14.75 10.75" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4.5" width="12" height="16" rx="2.5" />
      <path d="M9 4.5H15V7H9V4.5Z" />
      <path d="M9 11H15" />
      <path d="M9 15H13" />
    </svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 16A7 7 0 1 1 19 16" />
      <path d="M12 13L15.5 9.5" />
      <path d="M12 16H12.01" />
      <path d="M8 16H8.01" />
      <path d="M16 16H16.01" />
    </svg>
  ),
  helmet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14A8 8 0 0 1 20 14V16H4V14Z" />
      <path d="M12 6V16" />
      <path d="M9 16V19H15V16" />
      <path d="M16 11.5H20" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8.25A3.75 3.75 0 1 0 12 15.75A3.75 3.75 0 1 0 12 8.25Z" />
      <path d="M19.4 15A1 1 0 0 0 19.6 16.1L20 16.8A1 1 0 0 1 19.7 18.1L18.1 19.7A1 1 0 0 1 16.8 20L16.1 19.6A1 1 0 0 0 15 19.4L14.3 19.7A1 1 0 0 0 13.7 20.65V21.5A1 1 0 0 1 12.7 22.5H11.3A1 1 0 0 1 10.3 21.5V20.65A1 1 0 0 0 9.7 19.7L9 19.4A1 1 0 0 0 7.9 19.6L7.2 20A1 1 0 0 1 5.9 19.7L4.3 18.1A1 1 0 0 1 4 16.8L4.4 16.1A1 1 0 0 0 4.2 15L3.9 14.3A1 1 0 0 0 2.95 13.7H2.1A1 1 0 0 1 1.1 12.7V11.3A1 1 0 0 1 2.1 10.3H2.95A1 1 0 0 0 3.9 9.7L4.2 9A1 1 0 0 0 4.4 7.9L4 7.2A1 1 0 0 1 4.3 5.9L5.9 4.3A1 1 0 0 1 7.2 4L7.9 4.4A1 1 0 0 0 9 4.2L9.7 3.9A1 1 0 0 0 10.3 2.95V2.1A1 1 0 0 1 11.3 1.1H12.7A1 1 0 0 1 13.7 2.1V2.95A1 1 0 0 0 14.3 3.9L15 4.2A1 1 0 0 0 16.1 4.4L16.8 4A1 1 0 0 1 18.1 4.3L19.7 5.9A1 1 0 0 1 20 7.2L19.6 7.9A1 1 0 0 0 19.4 9L19.7 9.7A1 1 0 0 0 20.65 10.3H21.5A1 1 0 0 1 22.5 11.3V12.7A1 1 0 0 1 21.5 13.7H20.65A1 1 0 0 0 19.7 14.3L19.4 15Z" />
    </svg>
  ),
};

function getCellIcon(cell: IndustryTableCell) {
  if (!cell.icon) {
    return null;
  }

  if (cell.icon.type === "industry") {
    return industryIconMap[cell.icon.key as IndustryIconKey];
  }

  return outcomeIconMap[cell.icon.key as OutcomeIconKey];
}

export function IndustryTable({ columns, rows }: IndustryTableProps) {
  return (
    <div className={styles.tableScroller}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.cells.map((cell) => cell.text).join("|")}>
              {row.cells.map((cell, index) => {
                const icon = getCellIcon(cell);

                return (
                  <td key={`${cell.text}-${index}`}>
                    {icon ? (
                      <div className={styles.tableLead}>
                        <span className={styles.tableIcon} aria-hidden>
                          {icon}
                        </span>
                        <span>{cell.text}</span>
                      </div>
                    ) : (
                      cell.text
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
