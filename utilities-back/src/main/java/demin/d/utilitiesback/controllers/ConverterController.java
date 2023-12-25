package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.*;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/converters")
public class ConverterController {
    @PostMapping(value = "/string-case")
    public String ConvertStringToBase64AndBack(@RequestBody StringBase64ConversionRequest request) {
        if (request.getType() == StringBase64ConversionRequestType.toBase64)
            return Base64.getEncoder().encodeToString(request.getStringToConvert().getBytes());
        return new String(Base64.getDecoder().decode(request.getStringToConvert()));
    }

    @PostMapping(value = "/string-case")
    public ConvertedStrings ConvertStringToCase(@RequestBody StringConversionRequest request) {
        var upperCase = new ConvertedString(request.getStringToConvert().toUpperCase(), StringConvertType.upperCase);
        var lowerCase = new ConvertedString(request.getStringToConvert().toLowerCase(), StringConvertType.lowerCase);
        var camelCase = new ConvertedString(toCamelCase(request.getStringToConvert(), true), StringConvertType.camelCase);
        var snakeCase = new ConvertedString(toSnakeCase(request.getStringToConvert()), StringConvertType.snakeCase);
        var capitalCase = new ConvertedString(capitalize(request.getStringToConvert()), StringConvertType.capitalCase);
        return new ConvertedStrings(List.of(upperCase, lowerCase, camelCase, snakeCase, capitalCase));
    }

    private String toSnakeCase(String string) {
        var result = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            result.append(Character.isLetterOrDigit(string.charAt(i)) ? Character.toLowerCase(string.charAt(i)) : '_');
        }
        return result.toString();
    }

    public static String toCamelCase(String string, boolean firstWordToLowerCase) {
        boolean isPrevLowerCase = false, isNextUpperCase = !firstWordToLowerCase;
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            char currentChar = string.charAt(i);
            if(!Character.isLetterOrDigit(currentChar)) {
                isNextUpperCase = !result.isEmpty() || isNextUpperCase;
            } else {
                result.append(
                        isNextUpperCase? Character.toUpperCase(currentChar) :
                                isPrevLowerCase ? currentChar: Character.toLowerCase(currentChar)
                );
                isNextUpperCase = false;
            }
            isPrevLowerCase = !result.isEmpty() && Character.isLowerCase(currentChar);
        }
        return result.toString();
    }

    public static String capitalize(String string) {
        var isWordStart = false;
        var result = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            isWordStart = i == 0 || !Character.isLetterOrDigit(string.charAt(i - 1));
            var currentChar = string.charAt(i);
            result.append(isWordStart ? Character.toUpperCase(currentChar) : currentChar);
        }
        return result.toString();
    }
}
