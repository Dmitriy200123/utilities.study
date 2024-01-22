package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.*;
import demin.d.utilitiesback.repositories.statistics.RequestStatisticsRepository;
import demin.d.utilitiesback.repositories.statistics.entities.RequestInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/converters")
public class ConverterController {
    private final RequestStatisticsRepository requestStatisticsRepository;

    public ConverterController(RequestStatisticsRepository requestStatisticsRepository) {
        this.requestStatisticsRepository = requestStatisticsRepository;
    }

    @PostMapping(value = "/number-notation")
    public ConvertedNumber ConvertToNumberNotation(@RequestBody NumberNotationRequest numberNotationRequest, HttpServletRequest request, HttpServletResponse response) {
        saveRequestInfo(request);

        var numberNotations = GetNumberNotations(null);
        if (!numberNotations.contains(numberNotationRequest.getCurrentNotation())) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new ConvertedNumber(String.format("Данная система счисления не поддерживается %s", numberNotationRequest.getCurrentNotation()));
        }
        if (!numberNotations.contains(numberNotationRequest.getNewNotation())) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new ConvertedNumber(String.format("Данная система счисления не поддерживается %s", numberNotationRequest.getNewNotation()));
        }

        long valueAsLong;
        try {
            valueAsLong = Long.parseLong(numberNotationRequest.getValueToNotation(), numberNotationRequest.getCurrentNotation());
        } catch (NumberFormatException ex) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new ConvertedNumber(String.format("Исходное число %s не принадлежит системе счисления %s", numberNotationRequest.getValueToNotation(), numberNotationRequest.getCurrentNotation()));
        }

        return new ConvertedNumber(Long.toString(valueAsLong, numberNotationRequest.getNewNotation()));
    }


    @GetMapping(value = "/number-notations")
    public List<Integer> GetNumberNotations(HttpServletRequest request) {
        saveRequestInfo(request);

        return IntStream.range(Character.MIN_RADIX, Character.MAX_RADIX + 1)
                .boxed()
                .collect(Collectors.toList());
    }

    @PostMapping(value = "/base-64")
    public Base64ConvertedString ConvertStringToBase64AndBack(@RequestBody StringBase64ConversionRequest base64ConversionRequest, HttpServletRequest request) {
        saveRequestInfo(request);

        if (base64ConversionRequest.getType() == StringBase64ConversionRequestType.toBase64)
            return new Base64ConvertedString(Base64.getEncoder().encodeToString(base64ConversionRequest.getStringToConvert().getBytes()));
        String result;
        try {
            result = new String(Base64.getDecoder().decode(base64ConversionRequest.getStringToConvert()));
        } catch (Exception e) {
            result = base64ConversionRequest.getStringToConvert();
        }
        return new Base64ConvertedString(result);
    }

    @PostMapping(value = "/string-case")
    public ConvertedStrings ConvertStringToCase(@RequestBody StringConversionRequest stringConversionRequest, HttpServletRequest request) {
        saveRequestInfo(request);

        var upperCase = new ConvertedString(stringConversionRequest.getStringToConvert().toUpperCase(), StringConvertType.upperCase);
        var lowerCase = new ConvertedString(stringConversionRequest.getStringToConvert().toLowerCase(), StringConvertType.lowerCase);
        var camelCase = new ConvertedString(toCamelCase(stringConversionRequest.getStringToConvert()), StringConvertType.camelCase);
        var snakeCase = new ConvertedString(toSnakeCase(stringConversionRequest.getStringToConvert()), StringConvertType.snakeCase);
        var capitalCase = new ConvertedString(capitalize(stringConversionRequest.getStringToConvert()), StringConvertType.capitalCase);
        return new ConvertedStrings(List.of(upperCase, lowerCase, camelCase, snakeCase, capitalCase));
    }

    private String toSnakeCase(String string) {
        var result = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            result.append(Character.isLetterOrDigit(string.charAt(i)) ? Character.toLowerCase(string.charAt(i)) : '_');
        }
        return result.toString();
    }

    private static String toCamelCase(String string) {
        var isPrevLowerCase = false;
        var isNextUpperCase = false;
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            char currentChar = string.charAt(i);
            if (!Character.isLetterOrDigit(currentChar)) {
                isNextUpperCase = !result.isEmpty() || isNextUpperCase;
            } else {
                result.append(
                        isNextUpperCase ? Character.toUpperCase(currentChar) :
                                isPrevLowerCase ? currentChar : Character.toLowerCase(currentChar)
                );
                isNextUpperCase = false;
            }
            isPrevLowerCase = !result.isEmpty() && Character.isLowerCase(currentChar);
        }
        return result.toString();
    }

    private static String capitalize(String string) {
        var isWordStart = false;
        var result = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            isWordStart = i == 0 || !Character.isLetterOrDigit(string.charAt(i - 1));
            var currentChar = string.charAt(i);
            result.append(isWordStart ? Character.toUpperCase(currentChar) : currentChar);
        }
        return result.toString();
    }

    private void saveRequestInfo(HttpServletRequest request) {
        if (request == null)
            return;

        var requestLog = new RequestInfo();
        requestLog.setRequestType(request.getRequestURI());
        requestStatisticsRepository.save(requestLog);
    }
}
