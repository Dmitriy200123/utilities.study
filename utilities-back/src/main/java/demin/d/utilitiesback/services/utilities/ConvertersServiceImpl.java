package demin.d.utilitiesback.services.utilities;

import demin.d.utilitiesback.contracts.utilities.base64.Base64ConvertedString;
import demin.d.utilitiesback.contracts.utilities.base64.StringBase64ConversionRequest;
import demin.d.utilitiesback.contracts.utilities.base64.StringBase64ConversionRequestType;
import demin.d.utilitiesback.contracts.utilities.numberNotation.ConvertedNumber;
import demin.d.utilitiesback.contracts.utilities.numberNotation.NumberNotationRequest;
import demin.d.utilitiesback.contracts.utilities.stringCase.ConvertedString;
import demin.d.utilitiesback.contracts.utilities.stringCase.ConvertedStrings;
import demin.d.utilitiesback.contracts.utilities.stringCase.StringConversionRequest;
import demin.d.utilitiesback.contracts.utilities.stringCase.StringConvertType;
import demin.d.utilitiesback.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class ConvertersServiceImpl implements ConvertersService {
    @Override
    public ConvertedNumber ConvertToNumberNotation(NumberNotationRequest numberNotationRequest) {
        if (numberNotationRequest.getValueToNotation() == null || numberNotationRequest.getValueToNotation().isBlank())
            return new ConvertedNumber("");

        var numberNotations = GetNumberNotations();

        if (!numberNotations.contains(numberNotationRequest.getCurrentNotation())) {
            throw new BadRequestException(String.format("Данная система счисления не поддерживается %s",
                    numberNotationRequest.getCurrentNotation()));
        }
        if (!numberNotations.contains(numberNotationRequest.getNewNotation())) {
            throw new BadRequestException(String.format("Данная система счисления не поддерживается %s",
                    numberNotationRequest.getNewNotation()));
        }

        long valueAsLong;
        try {
            valueAsLong = Long.parseLong(numberNotationRequest.getValueToNotation(), numberNotationRequest.getCurrentNotation());
        } catch (NumberFormatException ex) {
            throw new BadRequestException(String.format("Исходное число %s не принадлежит системе счисления %s",
                    numberNotationRequest.getValueToNotation(),
                    numberNotationRequest.getCurrentNotation()));
        }

        return new ConvertedNumber(Long.toString(valueAsLong, numberNotationRequest.getNewNotation()));
    }

    @Override
    public List<Integer> GetNumberNotations() {
        return IntStream.range(Character.MIN_RADIX, Character.MAX_RADIX + 1)
                .boxed()
                .collect(Collectors.toList());
    }

    @Override
    public Base64ConvertedString ConvertStringToBase64AndBack(StringBase64ConversionRequest base64ConversionRequest) {
        if (base64ConversionRequest.getStringToConvert() == null || base64ConversionRequest.getStringToConvert().isBlank())
            return new Base64ConvertedString("");

        if (base64ConversionRequest.getType() == StringBase64ConversionRequestType.toBase64)
            return new Base64ConvertedString(Base64.getEncoder()
                    .encodeToString(base64ConversionRequest
                            .getStringToConvert()
                            .getBytes()));
        String result;
        try {
            result = new String(Base64.getDecoder().decode(base64ConversionRequest.getStringToConvert()));
        } catch (Exception e) {
            result = base64ConversionRequest.getStringToConvert();
        }
        return new Base64ConvertedString(result);
    }

    @Override
    public ConvertedStrings ConvertStringToCase(StringConversionRequest stringConversionRequest) {
        if (stringConversionRequest.getStringToConvert() == null || stringConversionRequest.getStringToConvert().isBlank())
            stringConversionRequest.setStringToConvert("");

        var upperCase = new ConvertedString(stringConversionRequest.getStringToConvert().toUpperCase(), StringConvertType.upperCase);
        var lowerCase = new ConvertedString(stringConversionRequest.getStringToConvert().toLowerCase(), StringConvertType.lowerCase);
        var camelCase = new ConvertedString(toCamelCase(stringConversionRequest.getStringToConvert()), StringConvertType.camelCase);
        var snakeCase = new ConvertedString(toSnakeCase(stringConversionRequest.getStringToConvert()), StringConvertType.snakeCase);
        var capitalCase = new ConvertedString(capitalize(stringConversionRequest.getStringToConvert()), StringConvertType.capitalCase);

        return new ConvertedStrings(List.of(upperCase, lowerCase, camelCase, snakeCase, capitalCase));
    }

    private static String toCamelCase(String string) {
        var isNextUpperCase = false;

        var result = new StringBuilder();

        for (int i = 0; i < string.length(); i++) {
            var currentChar = string.charAt(i);
            if (!Character.isLetterOrDigit(currentChar)) {
                isNextUpperCase = !result.isEmpty() || isNextUpperCase;
            } else {
                result.append(
                        isNextUpperCase ? Character.toUpperCase(currentChar) : currentChar
                );
                isNextUpperCase = false;
            }
        }

        return result.toString();
    }

    private String toSnakeCase(String string) {
        var result = new StringBuilder();

        var isUnderscorePrev = false;

        for (int i = 0; i < string.length(); i++) {
            if (Character.isLetterOrDigit(string.charAt(i))) {
                result.append(Character.toLowerCase(string.charAt(i)));
                isUnderscorePrev = false;
            } else {
                if (!isUnderscorePrev && !result.isEmpty()) {
                    result.append('_');
                    isUnderscorePrev = true;
                }
            }
        }

        return result.toString();
    }

    private static String capitalize(String string) {
        var isWordStart = false;
        var result = new StringBuilder();

        for (int i = 0; i < string.length(); i++) {
            isWordStart = i == 0 || !Character.isLetterOrDigit(string.charAt(i - 1));
            var currentChar = string.charAt(i);
            result.append(isWordStart ? Character.toUpperCase(currentChar) : Character.toLowerCase(currentChar));
        }

        return result.toString();
    }
}
