import React from 'react';
import { TableMessage as TableMessageType } from '../../types/messages';

interface Props {
  message: TableMessageType;
}

export const TableMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="message table-message">
      <table>
        <thead>
          <tr>
            {message.headers.map((header, index) => (
              <th key={`header-${index}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {message.rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 