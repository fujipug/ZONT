import React, { Key, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { getMessages } from "@/app/network/firebase";
import { DocumentData } from "firebase/firestore";

export const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "FECHA", uid: "date" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

interface IconProps extends React.SVGProps<SVGSVGElement> { }

export const EyeIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const statusColorMap: { [key: string]: "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined } = {
  replied: "success",
  unread: "danger",
  read: "warning",
};

export default function Messages() {
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    getMessages().then((messages) => {
      setMessages(messages);
    })
  }, []);

  const renderCell = useCallback((message: DocumentData, columnKey: Key) => {
    const cellValue = message[columnKey as string];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: message.imgUrl }}
            description={message.email}
            name={`${message.firstName} ${message.lastName}`}
          >
            {message.email}
          </User>
        );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {new Date(message?.date?.seconds * 1000).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            {/* <p className="text-bold text-sm cap</p>italize text-default-400">{message.djName}</p> */}
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[message.status]} size="sm" variant="flat">
            {message.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            {/* <Tooltip content="Edit message">
              <span className="text-lg text-default-400</Tooltip> cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip> */}
            <Tooltip color="danger" content="Delete message">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={messages}>
          {(message) => (
            <TableRow key={message.messageId}>
              {(columnKey) => <TableCell>{renderCell(message, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

