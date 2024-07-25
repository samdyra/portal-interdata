import click


@click.group(short_help="json_table CLI.")
def json_table():
    """json_table CLI.
    """
    pass


@json_table.command()
@click.argument("name", default="json_table")
def command(name):
    """Docs.
    """
    click.echo("Hello, {name}!".format(name=name))


def get_commands():
    return [json_table]
