package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.utilities.base64.Base64ConvertedString;
import demin.d.utilitiesback.contracts.utilities.base64.StringBase64ConversionRequest;
import demin.d.utilitiesback.contracts.utilities.numberNotation.ConvertedNumber;
import demin.d.utilitiesback.contracts.utilities.numberNotation.NumberNotationRequest;
import demin.d.utilitiesback.contracts.utilities.stringCase.ConvertedStrings;
import demin.d.utilitiesback.contracts.utilities.stringCase.StringConversionRequest;
import demin.d.utilitiesback.services.requestStatistics.RequestStatisticsService;
import demin.d.utilitiesback.services.utilities.ConvertersService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/converters")
@RequiredArgsConstructor
public class ConverterController {
    private final ConvertersService convertersService;
    private final RequestStatisticsService requestStatisticsService;

    @PostMapping(value = "/number-notation")
    public ConvertedNumber ConvertToNumberNotation(@RequestBody NumberNotationRequest numberNotationRequest, HttpServletRequest request) {
        requestStatisticsService.saveRequestInfo(request);

        return convertersService.ConvertToNumberNotation(numberNotationRequest);
    }


    @GetMapping(value = "/number-notations")
    public List<Integer> GetNumberNotations(HttpServletRequest request) {
        requestStatisticsService.saveRequestInfo(request);

        return convertersService.GetNumberNotations();
    }

    @PostMapping(value = "/base-64")
    public Base64ConvertedString ConvertStringToBase64AndBack(@RequestBody StringBase64ConversionRequest base64ConversionRequest, HttpServletRequest request) {
        requestStatisticsService.saveRequestInfo(request);

        return convertersService.ConvertStringToBase64AndBack(base64ConversionRequest);
    }

    @PostMapping(value = "/string-case")
    public ConvertedStrings ConvertStringToCase(@RequestBody StringConversionRequest stringConversionRequest, HttpServletRequest request) {
        requestStatisticsService.saveRequestInfo(request);

        return convertersService.ConvertStringToCase(stringConversionRequest);
    }
}
