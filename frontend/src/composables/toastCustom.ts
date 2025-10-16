import ErrorToast from "@/components/Toast/ErrorToast .vue";
import SucessToast from "@/components/Toast/SucessToast.vue";

import { computed, markRaw } from "vue";
import { toast } from "vue-sonner";

export default class useToastCustom {
  success = (msg: string) => {
    toast(markRaw(SucessToast), {
      style: {
        fontSize: "1em",
        color: "#fff",
        borderColor: "#FFF",
        background: "#ac4dff",
      },
      componentProps: {
        message: msg,
      },
    });
  };
  error = async (msg: string): Promise<void> => {
    toast(markRaw(ErrorToast), {
      style: {
        fontSize: "1em",
        color: "#fff",
        borderColor: "#FFF",
        background: "#ff4d86",
      },
      componentProps: {
        message: msg,
      },
    });
  };
}
