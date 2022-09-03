package com.skilldistillery.hshtracker.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="education_event")
public class EducationEvent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@CreationTimestamp
	private LocalDateTime date;
	private int duration;
	private String subject;
	private String location;
	private String student;
	private String notes;

	public EducationEvent() {
		super();
	}
	
	public EducationEvent(int id, LocalDateTime date, int duration, String subject, String location, String student,
			String notes) {
		super();
		this.id = id;
		this.date = date;
		this.duration = duration;
		this.subject = subject;
		this.location = location;
		this.student = student;
		this.notes = notes;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public int getDuration() {
		return duration;
	}


	public void setDuration(int duration) {
		this.duration = duration;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getStudent() {
		return student;
	}


	public void setStudent(String student) {
		this.student = student;
	}


	public String getNotes() {
		return notes;
	}


	public void setNotes(String notes) {
		this.notes = notes;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EducationEvent other = (EducationEvent) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "EducationEvent [id=" + id + ", date=" + date + ", duration=" + duration + ", subject=" + subject
				+ ", location=" + location + ", student=" + student + ", notes=" + notes + "]";
	}

}
