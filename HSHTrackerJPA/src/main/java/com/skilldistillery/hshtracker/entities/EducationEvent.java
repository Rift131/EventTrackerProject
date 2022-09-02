package com.skilldistillery.hshtracker.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="education_event")
public class EducationEvent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private LocalDateTime date;
//	private double duration;
//	private String subject;
//	private String location;
//	private String student;
//	private String notes;

	public EducationEvent() {
		super();
	}
	
	
	public EducationEvent(int id, LocalDateTime date) {
	super();
	this.id = id;
	this.date = date;
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
		return "EducationEvent [id=" + id + ", date=" + date + "]";
	}

}
