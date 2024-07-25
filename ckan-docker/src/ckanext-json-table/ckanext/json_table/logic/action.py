import ckan.plugins.toolkit as tk
import ckanext.json_table.logic.schema as schema


@tk.side_effect_free
def json_table_get_sum(context, data_dict):
    tk.check_access(
        "json_table_get_sum", context, data_dict)
    data, errors = tk.navl_validate(
        data_dict, schema.json_table_get_sum(), context)

    if errors:
        raise tk.ValidationError(errors)

    return {
        "left": data["left"],
        "right": data["right"],
        "sum": data["left"] + data["right"]
    }


def get_actions():
    return {
        'json_table_get_sum': json_table_get_sum,
    }
