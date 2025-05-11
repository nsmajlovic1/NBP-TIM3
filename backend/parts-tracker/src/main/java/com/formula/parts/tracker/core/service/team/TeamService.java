package com.formula.parts.tracker.core.service.team;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.dto.team.TeamMemberResponse;
import com.formula.parts.tracker.shared.dto.team.TeamRequest;
import com.formula.parts.tracker.shared.dto.team.TeamResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

import java.util.List;

public interface TeamService {
    TeamResponse create(TeamRequest request) throws ApiException;

    Page<TeamResponse> getAllTeams(String search, Long page, Long size);

    TeamResponse getTeam (long id) throws ApiException;

    void assignMember(Long teamId, Long userId) throws ApiException;

    void removeTeamMember(Long teamId, Long userId) throws ApiException;

    List<TeamMemberResponse> getAvailableLogisticUsers();
    List<TeamMemberResponse> getAvailableMechanicUsers();
}
