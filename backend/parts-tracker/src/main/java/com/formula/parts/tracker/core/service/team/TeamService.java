package com.formula.parts.tracker.core.service.team;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.team.TeamRequest;
import com.formula.parts.tracker.shared.dto.team.TeamResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

public interface TeamService {
    TeamResponse create(TeamRequest request) throws ApiException;

    Page<TeamResponse> getAllTeams(String search, Long page, Long size);

    //void removeTeamMember (long id) throws ApiException;
}
