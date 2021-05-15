package algohub.api;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

// 미사용
@Getter
@Setter
public class ListResult<T> extends CommonResult {
    private List<T> data;
}
