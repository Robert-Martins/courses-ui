package com.robert.martins.courses_ui.presentation.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class EnumDto {

    private String name;
    private String description;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        EnumDto enumDto = (EnumDto) o;
        return Objects.equals(name, enumDto.name) && Objects.equals(description, enumDto.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description);
    }
}
