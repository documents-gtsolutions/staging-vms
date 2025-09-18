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
    OWNER = 1,
    ADMIN = 2,
    PARENT = 3,
    TEACHER = 4,
    STUDENT = 5,
  }

  export type SvgProps = {
    size?: number;
    color?: string;
    className?: string;
  }