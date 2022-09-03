package com.skilldistillery.hshtracker.services;

import java.util.List;

import com.skilldistillery.hshtracker.entities.EducationEvent;

public interface EducationEventService {
List<EducationEvent> index();
EducationEvent edEventById(int edId);
EducationEvent addEdEvent(EducationEvent edEvent);
EducationEvent updateEdEvent(EducationEvent edEvent, int edId);
}
