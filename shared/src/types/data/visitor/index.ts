interface VisitorData {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

type VisitorChangeData = Omit<VisitorData, 'id' | 'createdAt'>;

export { VisitorChangeData, VisitorData };
