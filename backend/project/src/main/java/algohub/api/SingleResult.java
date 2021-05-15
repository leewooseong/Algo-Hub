package algohub.api;

import lombok.Getter;
import lombok.Setter;

// 미사용
@Getter
@Setter
public class SingleResult<T> extends CommonResult {
    private T data;
}
