export class EdEvent {
  id: number;
  date: string | null;
  duration: number;
  subject: string;
  location: string;
  student: string;
  notes: string;

  constructor(
    id: number = 0,
    date: string = '',
    duration: number = 0,
    subject: string = '',
    location: string = '',
    student: string = '',
    notes: string = ''
  ) {
    this.id = id;
    this.date = date;
    this.duration = duration;
    this.subject = subject;
    this.location = location;
    this.student = student;
    this.notes = notes;
  }
}
