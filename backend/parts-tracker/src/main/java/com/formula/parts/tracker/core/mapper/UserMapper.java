package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.shared.dto.user.UserRegistrationRequest;
import com.formula.parts.tracker.shared.dto.user.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    User toEntity(final UserRegistrationRequest userRegistrationRequest);
    
    UserResponse toUserResponse(final User user);

}
