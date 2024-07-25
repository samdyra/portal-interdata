import ckan.plugins.toolkit as tk


def json_table_required(value):
    if not value or value is tk.missing:
        raise tk.Invalid(tk._("Required"))
    return value


def get_validators():
    return {
        "json_table_required": json_table_required,
    }
