package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.shared.dto.team.TeamRequest;
import com.formula.parts.tracker.shared.dto.team.TeamResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TeamMapper {
    TeamResponse toResponse(final Team source);

    List<TeamResponse> toResponses(final List<Team> source);

    Team toEntity(TeamRequest request);
}
