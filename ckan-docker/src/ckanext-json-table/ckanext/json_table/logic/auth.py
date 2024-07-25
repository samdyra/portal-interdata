import ckan.plugins.toolkit as tk


@tk.auth_allow_anonymous_access
def json_table_get_sum(context, data_dict):
    return {"success": True}


def get_auth_functions():
    return {
        "json_table_get_sum": json_table_get_sum,
    }
