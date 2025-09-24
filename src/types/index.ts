export enum NotificationType {
    UPDATE = 'update',
    ENROLLMENT = 'enrollment',
    PAYMENT = 'payment',
    MESSAGE = 'message',
  }
  
  export enum NotificationStatus {
    UNREAD = 'unread',
    READ = 'read',
  }

  export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    PENDING = 'pending',
    LOCKED = 'locked',
  }

  export enum UserRole {
    ADMIN = 1,
    USER = 2,
  }

  export type SvgProps = {
    size?: number;
    color?: string;
    className?: string;
  }