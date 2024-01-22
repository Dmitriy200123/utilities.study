package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.ConvertedString;
import demin.d.utilitiesback.contracts.ConvertedStrings;
import demin.d.utilitiesback.contracts.StringConversionRequest;
import demin.d.utilitiesback.contracts.StringConvertType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/converters")
public class ConverterController {
    @PostMapping(value = "/string-case")
    public ConvertedStrings ConvertedStrings (@RequestBody StringConversionRequest request) {
        var upperCase = new ConvertedString(request.getStringToConvert().toUpperCase(), StringConvertType.upperCase);
        var lowerCase = new ConvertedString(request.getStringToConvert().toLowerCase(), StringConvertType.lowerCase);
        return new ConvertedStrings(List.of(upperCase, lowerCase));
    }
}
