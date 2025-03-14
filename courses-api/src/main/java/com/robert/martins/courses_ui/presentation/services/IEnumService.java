package com.robert.martins.courses_ui.presentation.services;

import com.robert.martins.courses_ui.presentation.dtos.EnumDto;

import java.util.Set;

public interface IEnumService {

    Set<EnumDto> findEnumByName(String enumName);

}
